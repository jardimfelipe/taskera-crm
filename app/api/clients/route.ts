import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const user = currentUser()
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  console.log("name", name)
  if (!user) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const clients = await db.client.findMany({
      where: {
        name: {
          contains: name || ''
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: name ? undefined : 5
    })
    return Response.json(clients)
  } catch (error) {
    console.error(error)
    return Response.json({ message: 'An error occurred while fetching clients' }, { status: 500 })
  }
}