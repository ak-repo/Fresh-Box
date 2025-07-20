import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">We're changing the way</span>
            <span className="block text-black">people connect</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. 
            Et labore commodo nulla aliqua proident mollit ullamco exercitation tempor.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-black tracking-wide uppercase">Our mission</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Creating meaningful connections
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="mt-5 text-xl text-gray-500">
                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. 
                Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.
              </p>
              <p className="mt-5 text-xl text-gray-500">
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. 
                Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-5xl font-extrabold">44 million</p>
              <p className="mt-2 text-lg font-medium text-gray-300">Transactions every 24 hours</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold">$119 trillion</p>
              <p className="mt-2 text-lg font-medium text-gray-300">Assets under holding</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold">46,000</p>
              <p className="mt-2 text-lg font-medium text-gray-300">New users annually</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-black tracking-wide uppercase">Our values</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How we work and what we believe in
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Be world-class',
              description: 'Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia.'
            },
            {
              name: 'Share everything you know',
              description: 'Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae.'
            },
            {
              name: 'Always learning',
              description: 'Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum.'
            },
            {
              name: 'Be supportive',
              description: 'Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus.'
            },
            {
              name: 'Take responsibility',
              description: 'Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure.'
            },
            {
              name: 'Enjoy downtime',
              description: 'Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius.'
            }
          ].map((value) => (
            <div key={value.name} className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <h3 className="mt-8 text-lg font-medium text-gray-900">{value.name}</h3>
                  <p className="mt-5 text-base text-gray-500">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo Cloud */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Trusted by the world's most innovative teams
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {['Transistor', 'Reform', 'Tuple', 'SavvyCal', 'Statamic'].map((company) => (
              <div key={company} className="col-span-1 flex justify-center">
                <div className="h-12 flex items-center text-gray-500 font-bold text-xl">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-black tracking-wide uppercase">Our team</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            The people behind the product
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
      </div>

      {/* Media Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-12">
          {/* Video Section */}
          <div className="bg-black rounded-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                alt="Office workspace"
              />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                alt="Team meeting"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;