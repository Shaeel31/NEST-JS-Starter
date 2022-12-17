import { ApiModelProperty } from '@nestjs/swagger';

export class ResturantDto {

    @ApiModelProperty()
    id: string

    @ApiModelProperty()
    name: string

    @ApiModelProperty()
    location: string;

    @ApiModelProperty()
    displayImageUrl: string;

    @ApiModelProperty()
    perNightCharges: string;

}
