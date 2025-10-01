// src/components/SubCompanies.tsx

import { Mountain, Heart, Tablet, Leaf, Briefcase } from 'lucide-react';

const subCompaniesData = [
    { 
        name: 'OYE Developers', 
        icon: Tablet, 
        focus: 'Software, Web & Tech Solutions', // [cite: 76]
        description: 'The technology arm of OYE PRODUCTIONS, offering software development, web design, and IT solutions, from applications to CCTV and security systems.' // [cite: 112, 113]
    },
    { 
        name: 'Ringscape', 
        icon: Heart, 
        focus: 'Wedding Photography & Videography', // [cite: 71]
        description: 'Captures life\'s most cherished moments with elegance and artistry, blending creativity with storytelling to preserve memories that last a lifetime.' // [cite: 91, 92]
    },
    { 
        name: 'Green Heaven Agro Plantation', 
        icon: Leaf, 
        focus: 'Agro & Export (Dehiattakandiya)', // [cite: 69]
        description: 'Specializes in sustainable agriculture and agro exports, focusing on cultivating high-quality crops while maintaining eco-friendly practices.' // [cite: 83, 84]
    },
    { 
        name: 'Better Days Ahead', 
        icon: Briefcase, 
        focus: 'In-house Events & Entertainment', // [cite: 75]
        description: 'Our in-house event brand, known for curating unforgettable experiences like our flagship event, Plein Air, blending music, art, and culture.' // [cite: 108, 109]
    },
    // OYE Photography, OYE Space, Growers Win Plantation would follow here...
];

export const SubCompanies = () => {
    return (
        <section id="subcompanies" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black dark:text-white">
                    Our Specialized Sub-Companies
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
                    A diverse portfolio built on focused expertise. [cite: 31]
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {subCompaniesData.map((company, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-amber-500"
                        >
                            <div className={`text-4xl mb-4 ${company.focus.includes('Agro') ? 'text-green-500' : 'text-amber-500'}`}>
                                <company.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">{company.name} [cite: 76, 71, 69, 75]</h3>
                            <p className="text-sm font-medium text-amber-500 mb-4">{company.focus}</p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {company.description} [cite: 112, 113, 91, 92, 83, 84, 108, 109]
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};