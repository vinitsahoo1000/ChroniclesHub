import axios from "axios";


const api_key = process.env.OcpApimSubscriptionKey


type ModerationInput = {
    content: string;
};

type TisaneResponse = {
    abuse?: Array<{
        type: string;
        severity: string;
    }>;
    hate?: any[];
    sentiment?: { polarity: string };
    [key: string]: any;
};

export const textModeration = async({content}:ModerationInput)=>{
    
    if (!api_key) {
    throw new Error("Missing API key for Tisane.ai");
    }

    try{
        const response = await axios.post<TisaneResponse>("https://api.tisane.ai/parse",{
            language: "en",
            content,
            settings: { output: 'detailed' }
        },{
            headers:{
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': api_key
            }
        })
        
        const data = response.data

        const isAbusive = data.abuse?.some(
            (entry) => entry.type !== "no_meaningful_content"
        )

        if(isAbusive|| data.hate?.length){
            console.warn("🚫 Content flagged:", data.abuse);
            return false
        }

        console.log("✅ Content looks clean.");
        return true
    }catch (error: any) {
        console.error("Text moderation API error:", error?.response?.data || error.message);
        return null;
    }

}