import crypto from 'crypto'

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!

export function Reptile(encryptedData: string): any {
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(SECRET_KEY),
        Buffer.alloc(16, 0)
    )

    let decrypted = decipher.update(encryptedData, 'base64', 'utf8')
    decrypted += decipher.final('utf8')

    return JSON.parse(decrypted)
}
