import supabaseClient from '../config/supabase.config.js';

class SupabaseService {

    async fetchSimilarDocuments(embeddings, matchCount = 5, threshold = 0.3, tweet_date) {

        try{
        const { data, error } = await supabaseClient.rpc('match_documents', {
            p_query_embedding: embeddings,
            p_match_count: matchCount,
            p_similarity_threshold: threshold,
            p_start_date: formatToPostgresTimestamp(tweet_date)
        });

            console.log('Supabase RPC result:', { data, error });   

            return data;
        }
        catch(error){
            return null;
        }
    }

    function formatToPostgresTimestamp(date) {
      const pad = (num, size = 2) => String(num).padStart(size, '0');
    
      const year = date.getUTCFullYear();
      const month = pad(date.getUTCMonth() + 1);
      const day = pad(date.getUTCDate());
      const hours = pad(date.getUTCHours());
      const minutes = pad(date.getUTCMinutes());
      const seconds = pad(date.getUTCSeconds());
      const milliseconds = pad(date.getUTCMilliseconds(), 6); // microseconds approximation
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
 }
    
}

export default new SupabaseService();
