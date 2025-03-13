import Pagination from "@/components/Pagination";

export default function Home() {
  return <Pagination itemCount={25} pageSize={5} currentPage={2} />;
}
