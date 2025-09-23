import dotenv from "dotenv";
import CacheService from "../services/cache.service.js";
import LLMService from "../services/llm.service.js";
import supabaseService from "../services/supabase.service.js";

dotenv.config();

async function verify_tweet(tweet_content, tweet_context, tweet_language, embeddings, tweet_date) {

  try {

    const references = await supabaseService.fetchSimilarDocuments(embeddings = embeddings, tweet_date = tweet_date) || [];

    const response = await LLMService.verifyContext(tweet_context, tweet_language, JSON.stringify(references));
    CacheService.setToContentCache(tweet_content, response);
    CacheService.setToContextCache(embeddings, response);

    return response;
    
  } catch (error) {
    return { error };
  }
}

export default verify_tweet;
