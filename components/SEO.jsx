import Head from 'next/head';


const SEO = ({
    title = 'Splitbee',
    description = 'Splitbee its a free, friendly & open-source platform that automatizes the process of splitting prizes of hackathons between mates and perform donations to non-profit organizations.',
    images = [{ url: "https://splitbee.vercel.app/logo.png" }],
    url = "https://splitbee.vercel.app",
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} key="description" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@kindlyweb3" />
            <meta name="twitter:title" content={title} key="tw-title" />
            <meta name="twitter:description" content={description} key="tw-description" />
            <meta name="twitter:image" content={images[0].url} key="tw-images" />

            <link rel="shortcut icon" href={images[0].url} />

            <meta property="og:title" content={title} key="og-title" />
            <meta property="og:description" content={description} key="og-description" />
            <meta property="og:image" content={images[0].url} key="og-images" />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={title} />
            <meta property="og:locale" content="es_ES" />
        </Head>
    )
}

export default SEO