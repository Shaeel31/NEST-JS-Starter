import { Injectable } from '@nestjs/common';
const { getColorFromURL } = require('color-thief-node');

@Injectable()
export class MediaUploadService {
  async getDominantColor(imageUrl) {
    const dominantColor = await getColorFromURL(imageUrl);
    const [r, g, b] = dominantColor;
    return { hexCode: this.rgb_to_hex(r, g, b) };
  }

  rgb_to_hex(red, green, blue) {
    const rgb = (red << 16) | (green << 8) | (blue << 0);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
  }
}
