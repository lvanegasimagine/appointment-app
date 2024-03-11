// import { type NextApiRequest } from 'next'
// import { NextResponse } from 'next/server'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST (req: NextApiRequest) {
//     const response = await req.json()
//   try {
//     const data = await resend.emails.send({
//         from: 'you@example.com',
//         to: 'user@gmail.com',
//         subject: 'hello world',
//         react: <Email url="https://example.com" />,
//       });
//     return NextResponse.json({ data })
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 })
//   }
// }
