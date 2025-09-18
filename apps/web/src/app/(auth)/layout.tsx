export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='flex flex-col w-full items-center justify-center h-screen'>
      {children}
    </div>
  )
}
