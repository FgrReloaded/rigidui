import React from 'react'

const Features = ({ title, features }: { title: string, features: { icon: React.ReactNode, title: string, description: string }[] }) => {
  return (
    <section className="py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 id="features" className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Discover Its <span className="text-indigo-600 dark:text-indigo-400">Features</span>
          </h2>
          <p className="md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The {title} component is packed with powerful features designed to provide an exceptional user experience.
          </p>
        </div>

        <div className="space-y-4 md:space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-3 md:gap-4 p-6 md:py-4 md:px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-transparent backdrop-blur-sm ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
              <div className="flex-shrink-0 rounded-full bg-gray-100 dark:bg-black w-20 h-20 md:w-8 md:h-8 flex items-center justify-center text-indigo-600 dark:text-indigo-400 ring-4 ring-indigo-500/20 dark:ring-indigo-500/30 mb-4 md:mb-0">
                {React.isValidElement(feature.icon) ? React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: 'w-10 h-10 md:w-4 md:h-4' }) : feature.icon}
              </div>
              <div className={`flex-grow text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400  leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features