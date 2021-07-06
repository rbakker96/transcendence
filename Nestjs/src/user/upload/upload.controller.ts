import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller()
export class UploadController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename(_, file, callback) {
                return callback(null, `${file.originalname}`);
            }
        })
    }))
    uploadFile(@UploadedFile() file) {
        return { url: `http://localhost:8000/api/uploads/${file.filename}`}
    }

    @Get('uploads/:path')
    async getImage(@Param('path') path, @Res() res: Response) {
        res.sendFile(path, {root: 'uploads'});
    }
}
