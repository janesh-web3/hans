 Project Context: Hotel Association of Nepal Sudurpashchim(HANS) 

 1. Project Overview
You are an expert full-stack developer assisting in building the official website for the Hotel Association of Nepal Sudurpashchim (HANS) . Focusing exclusively on the 8 districts of Sudurpashchim Province (Kailali, Kanchanpur, Doti, Bajhang, Bajura, Achham, Dadeldhura, Baitadi). 

The project must be built in an aggressive . Prioritize speed, standard libraries, and clean architecture over custom, overly-complex implementations.

2. Folder Structure & Architecture
The project is a monorepo containing three distinct applications.Strictly adhere to this folder structure:

/hans
  /frontend   -> Public-facing React application (Tourists & General Public)
  /admin      -> React Admin Dashboard (For HAN Committee to manage content)
  /backend    -> Node.js/Express REST API & Database connection
  claude.md   -> This file (Project instructions)

3. Technology Stack
Use the following modern, rapid-development stack. Do not introduce unapproved libraries.

Frontend & Admin (React)
Framework: React 18+ via Vite
Language: TypeScript (Strict mode)
- Styling: Tailwind CSS + `shadcn/ui` (for accessible, pre-built components)
- Routing: React Router v6
- Forms: React Hook Form + Zod (for validation)
- Maps: `react-leaflet` + `leaflet` (For the interactive hotel directory map)
- State/Data: TanStack Query (React Query) for server state, Zustand or Context API for global UI state.

Backend (Node.js)
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB via Mongoose
- Auth: JWT (jsonwebtoken) + bcryptjs
- Utilities: cors, dotenv, express-async-handler (for error handling)

## 4. Design System & Theming
The UI must reflect the natural beauty of Sudurpashchim while maintaining professional authority.

- Primary Color (Forest Green):** Represents lush forests and eco-tourism. Use for primary buttons, active states, headers, and key accents. (Tailwind: `green-700` to `green-900` range).
- Secondary Color (River Blue):** Represents the Mahakali river and clear Himalayan skies. Use for secondary buttons, links, hover states, and informational banners. (Tailwind: `blue-600` to `blue-800` range).
- Neutrals:** Use `slate` or `gray` for backgrounds and text. Ensure high contrast for accessibility.
- Typography:** Use a clean Sans-Serif (e.g., Inter or Poppins) for body text, and a modern Serif (e.g., Playfair Display) for main headings to give a premium hospitality feel.
- UI Rules: Use rounded corners (`rounded-lg`), subtle shadows (`shadow-sm`), and plenty of whitespace. Mobile-first responsive design is mandatory.

## 5. Database Schema Guidelines (Mongoose)
When generating backend models, use these core schemas:

- **User:** `name`, `email`, `password` (hashed), `role` (enum: 'admin').
- **Hotel:** `name`, `district` (enum of the 8 Sudurpashchim districts), `category` (enum: 'Star-Rated', 'Resort', 'Boutique', 'Homestay', 'Budget'), `coordinates` (lat, lng), `amenities` (array of strings), `images` (array of URLs), `description`, `contactInfo` (phone, email, address), `websiteUrl`, `isActive` (boolean).
- **Event:** `titleEn`, `titleNp`, `descriptionEn`, `descriptionNp`, `startDate`, `endDate`, `location`, `registrationLink`.

*Note: Always include `timestamps: true` in Mongoose schemas.*

## 6. API & Backend Rules
- **RESTful Conventions:** Use standard HTTP methods. Prefix all routes with `/api/v1/`.
- **Error Handling:** Create a global error handling middleware. Never expose raw Mongoose or Node errors to the client. Return structured JSON errors: `{ success: false, message: "...", statusCode: 400 }`.
- **Pagination & Filtering:** The `GET /api/v1/hotels` endpoint MUST support query parameters for `district`, `category`, `page`, and `limit`.
- **Security:** Implement CORS properly (allow only frontend and admin origins). Sanitize inputs. Protect admin routes with JWT middleware.

## 7. Frontend & Admin Rules
- **Mock Data:** If the backend API is not ready, create a `/mock` folder in the frontend/admin and use local JSON data to build the UI first.
- **Component Structure:** Keep components small. Extract complex logic into custom hooks (e.g., `useHotels`, `useAuth`).
- **Admin Panel:** The admin panel should be functional over beautiful. Use standard `shadcn/ui` data tables for listing items and standard forms for CRUD operations.

## 8. Instructions 
When generating code, you MUST follow these rules:

1.  **Context Awareness:** Always remember the 3-folder structure. If I ask for a frontend component, put it in `/frontend`. If I ask for an API route, put it in `/backend`.
2.  **No Over-engineering:** We have a 1-week deadline. Use pre-built `shadcn/ui` components. Do not write custom CSS animations unless explicitly asked. Do not build complex image croppers; use simple URL inputs or basic file uploads.
3.  **Complete Files:** When modifying a file, provide the *entire* file content unless it's excessively long. Do not leave `// ... rest of the code` placeholders.
4.  **TypeScript:** Use strict TypeScript. Define interfaces for all Props, API responses, and Mongoose documents.
5.  **Error Handling:** Always wrap async backend functions in try/catch blocks or use `express-async-handler`. Always handle loading and error states in React components using React Query.
6.  **Step-by-Step Execution:** If I ask for a large feature (e.g., "Build the Hotel Directory"), break it down. First, give me the backend API. Second, give me the frontend data fetching hook. Third, give me the UI components.
7.  **Sudurpashchim Context:** Hardcode the 8 districts (Kailali, Kanchanpur, Doti, Bajhang, Bajura, Achham, Dadeldhura, Baitadi) in a shared constants file. Do not hallucinate districts from other provinces.

## 9. Immediate Next Steps
Acknowledge that you have read and understood this `claude.md` file. 
Then, wait for my prompt