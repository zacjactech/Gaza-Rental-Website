import { Shield, Users } from 'lucide-react';

const TrustFactors = () => {
  const factors = [
    {
      id: 1,
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: 'Verified Landlords',
      description: 'All landlords are verified to ensure security and trust'
    },
    {
      id: 2,
      icon: <Users className="h-12 w-12 text-primary" />,
      title: 'Verified Tenants',
      description: 'We verify tenants to ensure safety and reliability'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {factors.map(factor => (
        <div 
          key={factor.id} 
          className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center hover-scale"
        >
          <div className="mb-4">
            {factor.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {factor.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {factor.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrustFactors;