---
title: "YelpClone - Restaurant Review Platform"
description: "A comprehensive Yelp clone web application built with Node.js, Express, and MongoDB featuring user authentication, restaurant reviews, and interactive maps."
published: 2024-08-01
technologies: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Mapbox API", "Passport.js"]
github: "https://github.com/jurinho17-sv/YelpClone"
image: "/projects/yelp-clone.jpg"
featured: true
draft: false
lang: "en"
---

## Overview

YelpClone is a full-stack web application that replicates the core functionality of Yelp. Users can discover restaurants, write reviews, upload photos, and interact with an intuitive map interface.

## Key Features

- **User Authentication**: Secure registration and login system using Passport.js
- **Restaurant Management**: Add, edit, and delete restaurant listings
- **Review System**: Write and manage reviews with star ratings
- **Interactive Maps**: Location-based restaurant discovery using Mapbox API
- **Image Upload**: Upload and manage restaurant photos
- **Responsive Design**: Mobile-friendly interface using Bootstrap

## Technical Implementation

The application follows the MVC (Model-View-Controller) architecture pattern and implements RESTful routing for clean URL structure. MongoDB serves as the database with Mongoose ODM for data modeling.

### Security Features
- Input validation and sanitization
- Authentication middleware
- Authorization controls
- XSS protection

## Challenges Overcome

- Implementing efficient geospatial queries for location-based searches
- Designing a scalable review system with proper data relationships
- Integrating third-party APIs while maintaining performance
- Ensuring responsive design across various device sizes

## Future Enhancements

- Real-time notifications
- Advanced search filters
- Restaurant recommendation algorithm
- Social features and user following
