import Image from 'next/image';
import LoadingGIF from '../../../../public/loading.gif';
export default function LoadingScreen() {
    return (
        <div className='bg-foreground min-h-screen grid items-center justify-center'>
            <Image src={LoadingGIF} alt='Loading...' />
        </div>
    )
}