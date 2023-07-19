import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'La Palme Verte',
	description:
		"Association étudiante de plongée sous-marine fondée en 2005 à l'UBS",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='fr' data-theme='default'>
			<body className={inter.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
