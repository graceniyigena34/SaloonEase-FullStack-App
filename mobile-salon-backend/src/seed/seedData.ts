import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import Salon from '../models/salon';
import Service from '../models/service';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/salon-ease';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({ role: 'owner' }); // Keep customers for now, or use deleteMany({}) to clear all
        await Salon.deleteMany({});
        await Service.deleteMany({});

        console.log('Existing salon data cleared.');

        // 1. Create Admin User (Owner)
        const hashedAdminPassword = await bcrypt.hash('Password123!', 10);
        const adminUser = await User.create({
            name: 'Salon Admin',
            email: 'admin@salonease.com',
            password: hashedAdminPassword,
            role: 'owner',
            isVerified: true
        });
        console.log('Admin user created: admin@salonease.com / Password123!');

        // 2. Sample Salons
        const salons = [
            {
                owner: adminUser._id,
                name: 'Elite Glow Studio',
                description: 'Experience luxury and precision. Our expert stylists provide the best hair and skin treatments in a relaxing environment.',
                phone: '+1 555-0101',
                email: 'contact@eliteglow.com',
                address: {
                    street: '123 Beauty Lane',
                    city: 'New York',
                    state: 'NY',
                    postalCode: '10001',
                    country: 'USA'
                },
                images: [
                    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
                    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
                    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80'
                ],
                isActive: true
            },
            {
                owner: adminUser._id,
                name: 'Modern Edge Barbers',
                description: 'Classic cuts with a modern twist. The ultimate grooming experience for the modern man.',
                phone: '+1 555-0202',
                email: 'info@modernedge.com',
                address: {
                    street: '456 Style Blvd',
                    city: 'Los Angeles',
                    state: 'CA',
                    postalCode: '90001',
                    country: 'USA'
                },
                images: [
                    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80',
                    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
                    'https://images.unsplash.com/photo-1621605815841-aa8db7c82093?w=800&q=80'
                ],
                isActive: true
            },
            {
                owner: adminUser._id,
                name: 'Zen Harmony Spa',
                description: 'Find your inner peace. We offer premium massage, facial, and wellness treatments.',
                phone: '+1 555-0303',
                email: 'hello@zenharmony.com',
                address: {
                    street: '789 Wellness Way',
                    city: 'Miami',
                    state: 'FL',
                    postalCode: '33101',
                    country: 'USA'
                },
                images: [
                    'https://images.unsplash.com/photo-1544161515-4af6b1d46afc?w=800&q=80',
                    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
                    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80'
                ],
                isActive: true
            }
        ];

        const createdSalons = await Salon.insertMany(salons);
        console.log(`${createdSalons.length} salons created.`);

        // 3. Sample Services
        const serviceData = [
            // Services for Salon 1
            {
                name: 'Luxury Haircut',
                description: 'Precision cut including wash and style.',
                duration: 60,
                price: 50,
                category: 'Hair',
                salon: createdSalons[0]._id
            },
            {
                name: 'Full Highlights',
                description: 'Brighten up your look with custom highlights.',
                duration: 120,
                price: 120,
                category: 'Color',
                salon: createdSalons[0]._id
            },
            // Services for Salon 2
            {
                name: 'Classic Trim',
                description: 'Traditional barber cut with hot towel finish.',
                duration: 30,
                price: 25,
                category: 'Hair',
                salon: createdSalons[1]._id
            },
            {
                name: 'Beard Grooming',
                description: 'Shaping and conditioning for your beard.',
                duration: 20,
                price: 15,
                category: 'Grooming',
                salon: createdSalons[1]._id
            },
            // Services for Salon 3
            {
                name: 'Swedish Massage',
                description: 'Relaxing full body massage.',
                duration: 60,
                price: 80,
                category: 'Wellness',
                salon: createdSalons[2]._id
            },
            {
                name: 'Deep Cleansing Facial',
                description: 'Rejuvenating skin treatment.',
                duration: 45,
                price: 65,
                category: 'Skincare',
                salon: createdSalons[2]._id
            }
        ];

        const createdServices = await Service.insertMany(serviceData);
        console.log(`${createdServices.length} services created.`);

        // Update salons with service references
        for (const salon of createdSalons) {
            const salonServices = createdServices.filter(s => s.salon.equals(salon._id));
            await Salon.findByIdAndUpdate(salon._id, {
                services: salonServices.map(s => s._id)
            });
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
