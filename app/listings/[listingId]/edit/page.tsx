'use client';

import { useParams, useRouter } from 'next/navigation';

type TParams = {
  listingId: string;
  name?: string;
};

const EditListingPage = () => {
  //   const route = useRouter();
  const params = useParams<TParams>();
  //   const listingId = params;
  // console.log(params?.listingId);
  return <div>Edit Listing Page {params?.listingId}</div>;
};
export default EditListingPage;
