import { DataResponse } from 'src/globals/global.interface';

export class VerifyEmailTransformer {
    transformEmailVerification(status: boolean): DataResponse<any> {
        const message = status
            ? 'Selamat, email kamu berhasil di verifikasi'
            : 'Maaf. Kami gagal untuk memverifikasi email kamu';

        return {
            message,
        };
    }
}
