import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"


const layout = async ({ children } : { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if(!currentUser) return redirect("/sign-in");
  return (
    <main className='flex h-screen'>
        {/* <Sidebar {...getCurrentUser}/>  we cant pass it directly without any proper destruction on the end side */}  
        {/* <Sidebar 
        fullName={currentUser.fullName} 
        avatar={currentUser.avatar} 
        email={currentUser.email} 
      /> */}
      <Sidebar {...currentUser}/>
        <section className='flex h-full flex-1 flex-col'>
            {/* <MobileNavigation
              fullName={currentUser.fullName} 
              avatar={currentUser.avatar} 
              email={currentUser.email} 
            /> */}
            <MobileNavigation {...currentUser} />

            <Header userId={currentUser.$id} accountId={currentUser.accountId}/>
            <div className='main-content'>{children}</div>
        </section>
        <Toaster />
        
        
    </main>
  )
}

export default layout
