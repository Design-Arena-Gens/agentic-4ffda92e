'use client'

import { useState, useRef } from 'react'
import { Car, Bike, MapPin, Users, Camera, Wrench, Share2, Plus, Heart, MessageCircle, Navigation } from 'lucide-react'

interface Vehicle {
  id: string
  type: 'car' | 'bike'
  name: string
  image: string
  specs: string
  mods: string
  owner: string
  likes: number
  comments: number
}

interface Meetup {
  id: string
  name: string
  location: string
  date: string
  attendees: number
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'upload' | 'meetups' | 'map'>('feed')
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      type: 'car',
      name: '2020 Honda Civic Type R',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      specs: 'Engine: 2.0L Turbo I4, HP: 306, 0-60: 4.9s',
      mods: 'Cold air intake, Cat-back exhaust, Coilovers, ECU tune',
      owner: 'RacerMike',
      likes: 42,
      comments: 8
    },
    {
      id: '2',
      type: 'bike',
      name: '2021 Yamaha R1',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
      specs: 'Engine: 998cc Inline-4, HP: 200, Top Speed: 186mph',
      mods: 'Akrapovic exhaust, Rearsets, Carbon fiber wheels',
      owner: 'BikerChick',
      likes: 68,
      comments: 12
    },
    {
      id: '3',
      type: 'car',
      name: '1969 Ford Mustang Boss 429',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5f5d3a1cc?w=800',
      specs: 'Engine: 7.0L V8, HP: 375, Classic Muscle',
      mods: 'Original resto, New paint, Performance headers',
      owner: 'ClassicCarl',
      likes: 95,
      comments: 23
    }
  ])

  const [meetups, setMeetups] = useState<Meetup[]>([
    {
      id: '1',
      name: 'Sunday Morning Cars & Coffee',
      location: 'Downtown Parking Lot, Main St',
      date: '2025-11-24 08:00 AM',
      attendees: 47
    },
    {
      id: '2',
      name: 'Bike Night Meetup',
      location: 'River Road Diner',
      date: '2025-11-26 06:00 PM',
      attendees: 32
    },
    {
      id: '3',
      name: 'Track Day - Spring Valley Raceway',
      location: 'Spring Valley Raceway',
      date: '2025-11-30 09:00 AM',
      attendees: 18
    }
  ])

  const [newVehicle, setNewVehicle] = useState({
    type: 'car' as 'car' | 'bike',
    name: '',
    specs: '',
    mods: '',
    owner: ''
  })

  const [selectedImage, setSelectedImage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitVehicle = () => {
    if (newVehicle.name && newVehicle.specs && newVehicle.owner && selectedImage) {
      const vehicle: Vehicle = {
        id: Date.now().toString(),
        type: newVehicle.type,
        name: newVehicle.name,
        image: selectedImage,
        specs: newVehicle.specs,
        mods: newVehicle.mods || 'Stock',
        owner: newVehicle.owner,
        likes: 0,
        comments: 0
      }
      setVehicles([vehicle, ...vehicles])
      setNewVehicle({ type: 'car', name: '', specs: '', mods: '', owner: '' })
      setSelectedImage('')
      setActiveTab('feed')
    }
  }

  const handleLike = (id: string) => {
    setVehicles(vehicles.map(v =>
      v.id === id ? { ...v, likes: v.likes + 1 } : v
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
                <Car className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  GearHeads Hub
                </h1>
                <p className="text-xs text-gray-400">Connect. Share. Ride.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">2,847 Members</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { id: 'feed', label: 'Feed', icon: Car },
              { id: 'upload', label: 'Share Your Ride', icon: Plus },
              { id: 'meetups', label: 'Meetups', icon: MapPin },
              { id: 'map', label: 'Map', icon: Navigation }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-orange-400 border-b-2 border-orange-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500 transition-all hover:shadow-xl hover:shadow-orange-500/20">
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    {vehicle.type === 'car' ? (
                      <Car className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Bike className="w-4 h-4 text-orange-400" />
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-orange-400">{vehicle.name}</h3>
                  <p className="text-sm text-gray-400 mb-1">Owner: <span className="text-white">{vehicle.owner}</span></p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-start space-x-2">
                      <Car className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-300">{vehicle.specs}</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Wrench className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-300">{vehicle.mods}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-700">
                    <button
                      onClick={() => handleLike(vehicle.id)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{vehicle.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{vehicle.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Share Your Ride
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Vehicle Type</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setNewVehicle({ ...newVehicle, type: 'car' })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center space-x-2 ${
                        newVehicle.type === 'car'
                          ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Car className="w-5 h-5" />
                      <span>Car</span>
                    </button>
                    <button
                      onClick={() => setNewVehicle({ ...newVehicle, type: 'bike' })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center space-x-2 ${
                        newVehicle.type === 'bike'
                          ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Bike className="w-5 h-5" />
                      <span>Bike</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Upload Photo</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-12 border-2 border-dashed border-gray-600 rounded-lg hover:border-orange-500 transition-all flex flex-col items-center justify-center space-y-3 text-gray-400 hover:text-orange-400"
                  >
                    {selectedImage ? (
                      <img src={selectedImage} alt="Preview" className="max-h-48 rounded-lg" />
                    ) : (
                      <>
                        <Camera className="w-12 h-12" />
                        <span>Click to upload image</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    value={newVehicle.owner}
                    onChange={(e) => setNewVehicle({ ...newVehicle, owner: e.target.value })}
                    placeholder="RacerMike"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Vehicle Name</label>
                  <input
                    type="text"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    placeholder="2020 Honda Civic Type R"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Specs</label>
                  <textarea
                    value={newVehicle.specs}
                    onChange={(e) => setNewVehicle({ ...newVehicle, specs: e.target.value })}
                    placeholder="Engine: 2.0L Turbo I4, HP: 306, 0-60: 4.9s"
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Mods (Optional)</label>
                  <textarea
                    value={newVehicle.mods}
                    onChange={(e) => setNewVehicle({ ...newVehicle, mods: e.target.value })}
                    placeholder="Cold air intake, Cat-back exhaust, Coilovers..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmitVehicle}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl"
                >
                  Share Your Ride
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meetups Tab */}
        {activeTab === 'meetups' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Upcoming Meetups
              </h2>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-semibold transition-all flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create Meetup</span>
              </button>
            </div>

            {meetups.map(meetup => (
              <div key={meetup.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-orange-400 mb-3">{meetup.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-orange-400" />
                        <span>{meetup.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <span className="text-orange-400">📅</span>
                        <span>{meetup.date}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Users className="w-5 h-5 text-orange-400" />
                        <span>{meetup.attendees} going</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all">
                      I'm Going
                    </button>
                    <button className="px-6 py-2 border border-gray-600 hover:border-orange-500 rounded-lg font-semibold transition-all text-gray-300 hover:text-orange-400">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map Tab */}
        {activeTab === 'map' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Meetup Locations & Members
              </h2>

              <div className="bg-gray-900/50 rounded-lg p-8 border-2 border-dashed border-gray-600 text-center">
                <Navigation className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">Interactive Map Feature</p>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  This would integrate with a mapping service to show:
                </p>
                <ul className="text-gray-400 mt-4 space-y-2 max-w-md mx-auto text-left">
                  <li className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span>Upcoming meetup locations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span>Member locations (with permission)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-orange-400" />
                    <span>Popular car spots and routes</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {meetups.map(meetup => (
                  <div key={meetup.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-5 h-5 text-orange-400" />
                      <h4 className="font-bold text-white">{meetup.name}</h4>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{meetup.location}</p>
                    <p className="text-xs text-gray-500">{meetup.attendees} attending</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
                <Car className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-400">GearHeads Hub</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 GearHeads Hub. Built for car enthusiasts, by car enthusiasts.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-400 transition-colors">About</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Rules</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
