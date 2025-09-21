import supabaseClient from '../config/supabase.config.js';

class SupabaseService {

    async fetchSimilarDocuments(embeddings, matchCount = 5, threshold = 0.3) {

        const { data, error } = await supabaseClient.rpc('match_documents', {
            match_count: matchCount,
            query_embedding: embeddings,
            similarity_threshold: threshold
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
