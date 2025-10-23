import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Camera, History, LogOut, User, Calendar, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PredictionHistory } from '../lib/api';
import { User as AuthUser } from '../lib/auth';

interface DashboardPageProps {
  user: AuthUser;
  predictions: PredictionHistory[];
  onSignout: () => void;
  onNewDetection: () => void;
  isLoadingHistory: boolean;
}

export function DashboardPage({ 
  user, 
  predictions, 
  onSignout, 
  onNewDetection,
  isLoadingHistory 
}: DashboardPageProps) {
  const [stats, setStats] = useState({
    total: 0,
    healthy: 0,
    diseased: 0,
    avgConfidence: 0
  });

  useEffect(() => {
    if (predictions.length > 0) {
      const healthy = predictions.filter(p => p.disease === 'Healthy').length;
      const diseased = predictions.length - healthy;
      const avgConf = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
      
      setStats({
        total: predictions.length,
        healthy,
        diseased,
        avgConfidence: Math.round(avgConf)
      });
    }
  }, [predictions]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onSignout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your plant health overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Scans</span>
              <History className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-3xl">{stats.total}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Healthy Plants</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-3xl text-green-600">{stats.healthy}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Diseased Plants</span>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-3xl text-red-600">{stats.diseased}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg. Confidence</span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-3xl text-blue-600">{stats.avgConfidence}%</div>
          </Card>
        </div>

        {/* New Detection Button */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl mb-2">Start New Detection</h3>
              <p className="text-gray-600">Upload a plant image to check for diseases</p>
            </div>
            <Button 
              onClick={onNewDetection}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Camera className="mr-2 h-5 w-5" />
              New Detection
            </Button>
          </div>
        </Card>

        {/* History Section */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Scans ({predictions.length})</TabsTrigger>
            <TabsTrigger value="diseased">Diseased ({stats.diseased})</TabsTrigger>
            <TabsTrigger value="healthy">Healthy ({stats.healthy})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {isLoadingHistory ? (
              <Card className="p-8 text-center text-gray-600">
                Loading history...
              </Card>
            ) : predictions.length === 0 ? (
              <Card className="p-8 text-center text-gray-600">
                No scans yet. Upload your first plant image to get started!
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {predictions.map((prediction) => (
                  <Card key={prediction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <ImageWithFallback
                        src={prediction.imageUrl}
                        alt={prediction.disease}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg mb-1">{prediction.disease}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {formatDate(prediction.timestamp)}
                          </div>
                        </div>
                        <Badge className={getSeverityColor(prediction.severity)}>
                          {prediction.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Confidence</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="diseased" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions
                .filter(p => p.disease !== 'Healthy')
                .map((prediction) => (
                  <Card key={prediction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <ImageWithFallback
                        src={prediction.imageUrl}
                        alt={prediction.disease}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg mb-1">{prediction.disease}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {formatDate(prediction.timestamp)}
                          </div>
                        </div>
                        <Badge className={getSeverityColor(prediction.severity)}>
                          {prediction.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Confidence</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="healthy" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions
                .filter(p => p.disease === 'Healthy')
                .map((prediction) => (
                  <Card key={prediction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <ImageWithFallback
                        src={prediction.imageUrl}
                        alt={prediction.disease}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg mb-1">{prediction.disease}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {formatDate(prediction.timestamp)}
                          </div>
                        </div>
                        <Badge className={getSeverityColor(prediction.severity)}>
                          {prediction.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Confidence</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
