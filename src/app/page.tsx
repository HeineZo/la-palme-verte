import JotaiTest from '@/components/JotaiTest';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='h-screen'>
			<button className='btn btn-primary'>Click me!</button>
			<JotaiTest />
		</main>
	);
}
