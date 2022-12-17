import { ApiModelProperty } from '@nestjs/swagger';

export class UsersDto {

  @ApiModelProperty()
  name : string

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;

  @ApiModelProperty()
  profileImageUrl: string;

  @ApiModelProperty()
  isAdmin: boolean;

}
