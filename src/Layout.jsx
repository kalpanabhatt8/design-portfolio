import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from "react"
import Header from './components/Header'
import CustomCursor from './components/CustomCursor'
import { ThemeProvider } from "./utils/ThemeContext";
const Layout = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        const metaTags = {
            '/': {
                title: "Home",
                description: "This is the home page of the website",
                keywords: 'home, react, website',
            },
            '/aboutus': {
                title: 'About Us',
                description: 'Learn more about us.',
                keywords: 'about us, company, information',
            },
            '/services': {
                title: 'Our Services',
                description: 'Explore the services we offer.',
                keywords: 'services, offerings, business',
            },
            '/blog': {
                title: 'Blog',
                description: 'Read our latest blog posts.',
                keywords: 'blog, articles, news',
            },
            '/contact-us': {
                title: 'Contact Us',
                description: 'Get in touch with us.',
                keywords: 'contact, reach out, support',
            },
        }
        const currentMeta = metaTags[pathname] || {
            title: 'Empower Edu',
            description: 'This is default information '
        }

        document.title = currentMeta.title
        let descriptionTag = document.querySelector('meta[name="description"]');
        if (!descriptionTag) {
            descriptionTag = document.createElement('meta');
            descriptionTag.setAttribute('name', 'description');
            document.head.appendChild(descriptionTag);
        }
        descriptionTag.setAttribute('content', currentMeta.description)
    })


    return (
        <div className="min-h-screen bg-hero-pattern bg-cover bg-center">
            <ThemeProvider>
              <CustomCursor />
            <Header/>
            <Outlet />
            </ThemeProvider>
        </div>
    )
}

export default Layout