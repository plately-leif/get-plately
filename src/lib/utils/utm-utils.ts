interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export function generateUTMLink(baseUrl: string, params: UTMParams): string {
  // Ensure baseUrl doesn't already have query parameters
  const separator = baseUrl.includes('?') ? '&' : '?';
  
  // Build the UTM parameters
  const utmParams = new URLSearchParams({
    utm_source: params.source,       // e.g., 'facebook', 'instagram', 'twitter', 'newsletter'
    utm_medium: params.medium,       // e.g., 'social', 'email', 'cpc', 'banner'
    utm_campaign: params.campaign,   // e.g., 'summer_launch', 'product_announcement'
    ...(params.content && { utm_content: params.content }), // e.g., 'header_banner', 'sidebar_ad'
    ...(params.term && { utm_term: params.term })           // e.g., 'restaurant+marketing', 'ai+for+restaurants'
  });

  return `${baseUrl}${separator}${utmParams.toString()}`;
}

// Example links for common marketing channels
export const exampleLinks = {
  facebook: {
    description: 'Facebook post',
    link: (campaign: string, content?: string) => 
      generateUTMLink('https://getplately.com', {
        source: 'facebook',
        medium: 'social',
        campaign,
        content
      })
  },
  instagram: {
    description: 'Instagram post/story',
    link: (campaign: string, content?: string) => 
      generateUTMLink('https://getplately.com', {
        source: 'instagram',
        medium: 'social',
        campaign,
        content: content || 'story'
      })
  },
  twitter: {
    description: 'Twitter post',
    link: (campaign: string, content?: string) => 
      generateUTMLink('https://getplately.com', {
        source: 'twitter',
        medium: 'social',
        campaign,
        content: content || 'tweet'
      })
  },
  linkedin: {
    description: 'LinkedIn post',
    link: (campaign: string, content?: string) => 
      generateUTMLink('https://getplately.com', {
        source: 'linkedin',
        medium: 'social',
        campaign,
        content: content || 'post'
      })
  },
  emailNewsletter: {
    description: 'Email newsletter',
    link: (campaign: string, content?: string) => 
      generateUTMLink('https://getplately.com', {
        source: 'newsletter',
        medium: 'email',
        campaign,
        content: content || 'main_cta'
      })
  },
  googleAds: {
    description: 'Google Ads campaign',
    link: (campaign: string, keyword: string) => 
      generateUTMLink('https://getplately.com', {
        source: 'google',
        medium: 'cpc',
        campaign,
        term: keyword.replace(/\s+/g, '+')
      })
  }
};

// Example usage:
// const summerCampaignLink = exampleLinks.facebook('summer_launch', 'profile_post');
// console.log(summerCampaignLink);
// Output: https://getplately.com?utm_source=facebook&utm_medium=social&utm_campaign=summer_launch&utm_content=profile_post
