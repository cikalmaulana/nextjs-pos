import crypto from 'crypto'

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
const KEY_32 = Buffer.alloc(32)
KEY_32.write(SECRET_KEY)

export function Raptor(data: any): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', KEY_32, Buffer.alloc(16, 0))
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}
