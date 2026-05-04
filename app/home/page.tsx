import Sidebar from '@/components/sidebar';
import ConcertCardList from '@/components/concertCardList';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar role="User" />
        <div className="flex-1">
          <div className="px-6 py-5 border-b border-slate-200 bg-white">
            <h1 className="text-2xl font-semibold text-slate-900">Available Concerts</h1>
            <p className="mt-1 text-sm text-slate-500">Showing 10 items, 5 cards per row.</p>
          </div>
          <ConcertCardList />
        </div>
      </div>
    </div>
  );
}
