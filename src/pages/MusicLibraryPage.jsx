import Header from "../components/Header";
import TotalList from '../components/TotalList';

function MusicLibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Music Library</h1>
          {/* might add search/filter controls here later */}
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <TotalList />
        </div>
      </div>
    </div>
  );
}

export default MusicLibraryPage;
