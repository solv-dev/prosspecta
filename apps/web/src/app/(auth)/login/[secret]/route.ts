import { type NextRequest, NextResponse } from 'next/server'
import { AuthenticateMutation } from '@/graphql/mutations'

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/login/[secret]'>
) {
  const params = await ctx.params
  const { secret } = params

  const authenticate = await fetch('http://localhost:3333/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: AuthenticateMutation,
      variables: {
        secret,
      },
    }),
  })

  try {
    if (!authenticate.ok) {
      console.error(
        'GraphQL request failed:',
        authenticate.status,
        authenticate.statusText
      )
      return NextResponse.json(
        { error: 'Authentication request failed' },
        { status: 500 }
      )
    }

    const data = await authenticate.json()
    console.log('GraphQL response:', data)

    const token = data.data?.authenticate?.token

    if (!token) {
      console.error('No token in response:', data)
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }

    const response = NextResponse.redirect(new URL('/', _req.url))
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (err) {
    console.error('Error in authentication route:', err)
    return NextResponse.json(
      { error: 'Failed to process authentication' },
      { status: 500 }
    )
  }
}
