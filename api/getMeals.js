// src/api/getMeals.js
import contentfulClient from './contentfulClient'; // Assuming you have a Contentful client setup

export const getMeals = async () => {
  try {
    const space = await contentfulClient.getSpace('4mohsjut8tcv'); // Replace with your Space ID
    const environment = await space.getEnvironment('master'); // Assuming 'master' environment

    const entries = await environment.getEntries({
      content_type: 'meal', // Replace 'meal' with the actual content type ID
    });

    return entries.items.map((entry) => {
      const fields = entry.fields;
      return {
        sys: entry.sys,  // Include the sys.id to use as the unique identifier
        name: fields.name['en-US'], // Assuming your fields are localized to 'en-US'
        timing: fields.timing['en-US'],
        isNonVeg: fields.isNonVeg['en-US'] || false,
      };
    });
  } catch (error) {
    console.error('Error fetching meals from Contentful:', error);
    return []; // Return an empty array if there is an error
  }
};
