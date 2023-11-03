import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
// import Modal from './components/modals/Modal';

import ToasterProvider from './providers/ToasterProvider';

import getCurrentUser from './actions/getCurrentUser';

import RentModal from './components/modals/RentModal';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from '@/app/components/navbar/Navbar';

import './globals.css';
import SearchModal from './components/modals/SearchModal';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnbn clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={nunito.className}>
        {/* <Modal actionLabel='Submit' isOpen={true} title='This is Test' /> */}
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
