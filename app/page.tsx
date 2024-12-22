'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  useRouter().push("/home");
}

export default Page;