import { appsettings } from '@config/appsettings';
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
    author?: string;
    description?: string;
    image?: string;
    keywords?: string[];
    title?: string;
    type?: 'article' | 'website';
    url?: string;
}

const SEO: React.FC<SEOProps> = ({
    author = appsettings.WEBSITE_DEFAULT_AUTHOR,
    description = appsettings.WEBSITE_DEFAULT_DESCRIPTION,
    image = appsettings.WEBSITE_DEFAULT_IMAGE,
    keywords = appsettings.WEBSITE_DEFAULT_KEYWORDS,
    title,
    type = 'website',
    url = window.location.href,
}) => {
    const fullTitle = `${appsettings.WEBSITE_DEFAULT_TITLE}${title ? ` | ${title}` : ''}`;
    const canonicalUrl = url.split('?')[0].split('#')[0];

    const metaTags = React.useMemo(() => {
        const tags = [
            { name: 'author', content: author },
            { name: 'description', content: description },
            { name: 'keywords', content: keywords.join(', ') },
            { name: 'title', content: fullTitle },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image },
            {
                property: 'og:site_name',
                content: appsettings.WEBSITE_DEFAULT_TITLE,
            },
            { property: 'og:title', content: fullTitle },
            { property: 'og:type', content: type },
            { property: 'og:url', content: canonicalUrl },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:creator', content: author },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image },
            { name: 'twitter:title', content: fullTitle },
            { property: 'og:locale', content: 'it_IT' },
        ];

        if (type === 'article') {
            tags.push(
                { property: 'article:author', content: author },
                {
                    property: 'article:publisher',
                    content: appsettings.WEBSITE_DEFAULT_TITLE,
                },
            );
        }

        return tags;
    }, [author, description, fullTitle, image, keywords, type, canonicalUrl]);

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <link rel="canonical" href={canonicalUrl} />
            <meta httpEquiv="content-language" content="it-IT" />
            {metaTags.map((tag, index) => (
                <meta key={index} {...tag} />
            ))}
        </Helmet>
    );
};
SEO.displayName = 'SEO';

export type { SEOProps };
export default SEO;
