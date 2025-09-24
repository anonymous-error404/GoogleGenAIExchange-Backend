import supabaseClient from '../config/supabase.config.js';

class SupabaseService {

    async fetchSimilarDocuments(embeddings, matchCount, threshold, tweet_date) {

        try {
            const { data, error } = await supabaseClient.rpc('match_documents', {
                p_query_embedding: embeddings,
                p_match_count: matchCount,
                p_similarity_threshold: threshold,
            });

            console.log('Supabase RPC result:', { data, error });

            return data;
        }
        catch (error) {
            return null;
        }
    }
}

export default new SupabaseService();
