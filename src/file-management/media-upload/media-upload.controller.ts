import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiImplicitFile, ApiUseTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { JwtAuthGuard } from './../../components/auth/jwt-auth.guard';
import * as jimp from 'jimp';
import { MediaUploadService } from './media-upload.service';

const pngFileFilter = (req, file, callback) => {
  let ext = path.extname(file.originalname);
  console.log(ext);
  console.log(process.env.whiteListedExtensions);
  if (!process.env.whiteListedExtensions.includes(ext.toLowerCase())) {
    req.fileValidationError = 'Invalid file type';
    return callback(
      new HttpException('Invalid file type', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  return callback(null, true);
};

@ApiUseTags('media-upload')
@Controller('media-upload')
@ApiBearerAuth()
export class MediaUploadController {
  constructor(private _mediaUploadService: MediaUploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post('mediaFiles/:folderName/:fileId')
  @ApiImplicitFile({ name: 'file', required: true, description: '' })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: pngFileFilter,
      storage: diskStorage({
        destination: function(req, file, cb) {
          const dir =
            'mediaFiles/SMM_Panel/' +
            req.params.folderName.toLowerCase() +
            '/' +
            req.params.fileId;
          fs.exists(dir, exist => {
            if (!exist) {
              return fs.mkdir(dir, { recursive: true }, error =>
                cb(error, dir),
              );  
            }
            return cb(null, dir);
          });
        },
        filename: (req, file, cb) => {
          console.log({ file });
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @UploadedFile() file,
    @Param('fileId') fileId: string,
    @Param('folderName') folderName: string,
  ) {
    debugger;
    file['url'] =
      process.env.URL +
      'media-upload/mediaFiles/' +
      folderName.toLowerCase() +
      '/' +
      fileId +
      '/' +
      file.filename;
    console.log({ file });

    if (!file['mimetype'].includes('video')) {
      jimp.read(file['path'], (err, img) => {
        if (err) {
          console.log({ err });
          return;
        }

        const height = img.bitmap.height;
        const width = img.bitmap.width;

        if ((height < 500 && width < 275) || file.size <= 500 * 1000) {
          return file;
        }

        const heightRatio = height / width;
        const widthRatio = width / height;

        file['path'] = file['path'].replace(
          file['filename'],
          `compressed/${file['filename']}`,
        );

        img.resize(500 * widthRatio, jimp.AUTO).write(file['path']);
      });
    }
    return file;
  }

  @Get('mediaFiles/:folderName/:fileId/:fileName')
  async mediaFiles(
    @Param('fileId') fileId: string,
    @Param('folderName') folderName: string,
    @Param('fileName') fileName: string,  
    @Res() res,
    @Query('size') size: string = 'original',
  ): Promise<any> {
    const sizeArray = ['original', 'compressed'];
    size = sizeArray.includes(size) ? size : 'original';
    folderName = folderName.toLowerCase();
    if (size == 'original') {
      res.sendFile(fileName, {
        root: 'mediaFiles/SMM_Panel/' + folderName + '/' + fileId,
      });
    } else {
      const dir =
        'mediaFiles/SMM_Panel/' +
        folderName +
        '/' +
        fileId +
        '/' +
        size +
        '/' +
        fileName;
      const exists = fs.existsSync(dir);
      if (!exists) {
        res.sendFile(fileName, {
          root: 'mediaFiles/SMM_Panel/' + folderName + '/' + fileId,
        });
        return;
      }

      res.sendFile(fileName, {
        root: 'mediaFiles/SMM_Panel/' + folderName + '/' + fileId + '/' + size,
      });
    }
  }

  @Get('getDominantColor')
  getDominantColor(@Query('imageUrl') imageUrl: string) {
    return this._mediaUploadService.getDominantColor(imageUrl);
  }
}
