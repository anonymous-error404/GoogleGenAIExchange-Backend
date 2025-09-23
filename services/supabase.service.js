import supabaseClient from '../config/supabase.config.js';

class SupabaseService {

    async fetchSimilarDocuments(embeddings, matchCount = 5, threshold = 0.3, tweet_date) {

        const { data, error } = await supabaseClient.rpc('match_documents', {
            p_query_embedding: embeddings,
            p_target_date: tweet_date,
            p_match_count: matchCount,
            p_similarity_threshold: threshold
        });

        console.log('Supabase RPC result:', { data, error });

        if (error) {
            console.error('Error fetching similar documents:', error);
            throw error;
        }
        
        return data;
    }
}

export default new SupabaseService();
