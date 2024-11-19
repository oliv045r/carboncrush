<template>
    <div class="library" >
        <h1>Ting du bør huske</h1>
        <p></p>
        <v-expansion-panels>
            <v-expansion-panel
                v-for="article in articles" :key="article.id" :title="article.title"
                >
                <v-expansion-panel-text class="text-left px-6 py-6" v-html="article.content"></v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>

export default {
    name: 'ArticleLibrary',
    components: {
        
    },
    data() {
        return {
            articles: [
                { 
                    id: 1,  
                    title: 'Baggrundsfarver', 
                    content: 'Mørkere farver som sort bruger typisk mindre energi på de fleste skærme, hvilket gør dem til et grønnere valg. På mange skærmtyper, især OLED (Organic Light Emitting Diode) skærme, bruger mørkere farver mindre energi, fordi hver pixel selv udsender lys. Når en pixel skal vise sort, er den i princippet slukket eller reduceret til minimal lysstyrke, hvilket reducerer energiforbruget. <br> <br> Lyse farver, som hvid, kræver derimod, at skærmens pixels lyser kraftigere, hvilket øger strømforbruget. Denne forskel er særligt mærkbar ved høje lysstyrkeniveauer og længere skærmtider – for eksempel ved hjemmesider, der vises i længere tid. Ved at vælge en mørkere baggrund kan du altså spare energi og reducere din hjemmesides CO2-aftryk en smule – især på enheder med OLED-skærme, som bliver mere og mere almindelige.' },

                {   id: 2, 
                    title: 'Skrifttyper', 
                    content: 'Når du vælger en skrifttype, der er integreret i HTML, kan det have en positiv indvirkning på din hjemmesides ydeevne. Websikre skrifttyper, som Arial, Verdana eller Georgia, er generelt lettere at indlæse, da de er tilgængelige på de fleste enheder uden behov for ekstra filoverførsler. <br> <br> Dette sparer båndbredde og reducerer energiforbruget, når siden indlæses. <br> <br> Moderne skrifttyper, der skal downloades som webfonte, kan derimod øge belastningen på serveren og kræve mere tid og data at indlæse, hvilket kan føre til et højere CO2-aftryk. Dette gælder især for skrifttyper med mange vægte og stilarter, da hver variation kræver sin egen fil. <br> <br> Ved at vælge en simpel og effektiv skrifttype kan du dermed optimere din hjemmesides hastighed og bæredygtighed, hvilket i sidste ende hjælper med at reducere dens samlede CO2-aftryk. Gør dit valg med omtanke, og se, hvordan det kan gøre en forskel!' },
                {   id: 3, 
                    title: 'Skriftfarver', 
                    content: 'Når du vælger fontfarve, er det vigtigt at tage hensyn til både læsbarhed og tilgængelighed. Den rette farve kan gøre en stor forskel i brugeroplevelsen, uanset hvilken baggrundsfarve der er valgt. <br> <br> For at sikre optimal læsbarhed er det vigtigt at skabe en god kontrast mellem tekst og baggrund. En høj kontrast, såsom mørk tekst på en lys baggrund, forbedrer læsbarheden for de fleste brugere, herunder dem med synsnedsættelser. Det anbefales at følge retningslinjerne for kontrastforhold, der hjælper med at sikre, at dit indhold er tilgængeligt for alle. <br> <br> Det er også vigtigt at overveje, at lysere farver typisk kræver mere energi at vise på skærme, især på OLED-enheder. Derfor kan det være en god idé at vælge mørkere farver, da de kan spare energi og reducere dit hjemmesides CO2-aftryk. <br> <br> Husk, at tilgængelighed ikke kun handler om visuel læsbarhed; det handler også om at skabe en oplevelse, hvor alle kan interagere med dit indhold effektivt. Ved at vælge en fontfarve, der både er visuelt tiltalende og energieffektiv, kan du forbedre din hjemmesides ydeevne og samtidig sikre, at den er tilgængelig for alle brugere. Gør dit valg med omtanke!'
                    },
                {   id: 4, 
                title: 'Billedformat', 
                content: 'Når du vælger billedformat til din hjemmeside, er det vigtigt at tænke på kvalitet og filstørrelse. Formater som JPEG og PNG er almindeligt anvendte, men nyere formater som WEBP og AVIF tilbyder bedre kompression og kvalitet. <br> <br> JPEG er ideelt til fotografier og giver en god balance mellem størrelse og kvalitet, mens PNG er bedre til billeder med gennemsigtighed. WEBP og AVIF kan reducere filstørrelserne betydeligt, hvilket forbedrer indlæsningstiderne og sparer båndbredde. <br> <br> Det rigtige valg kan også påvirke tilgængeligheden, da hurtigere indlæsning giver en bedre brugeroplevelse. Vær opmærksom på, hvordan dit valg kan optimere både ydeevne og bæredygtighed. Gør dit valg med omtanke!' },
                {   id: 5, 
                title: 'Billedopløsning', 
                content: 'Når du vælger billedkvalitet til din hjemmeside, er det vigtigt at overveje både kvalitet og filstørrelse. Højere billedkvalitet kan forbedre det visuelle indtryk, men det kan også øge filstørrelsen. <br> <br> At finde den rette balance er afgørende, da større billeder kan forlænge indlæsningstiderne og øge energiforbruget. Ved at vælge en passende billedkvalitet kan du sikre hurtigere indlæsning, hvilket forbedrer brugeroplevelsen og samtidig sparer båndbredde. <br> <br> Husk, at dit valg af billedkvalitet kan have indflydelse på både ydeevne og bæredygtighed. Tænk over det, når du designer din hjemmeside!' },
                {   id: 6, 
                title: 'Animationer', 
                content: 'Når du vælger mængden af animationer til din hjemmeside, er det vigtigt at overveje både visuel indvirkning og ydeevne. Flere animationer kan forbedre det visuelle udtryk, men de kan også belaste systemet. <br> <br> At finde den rette balance er afgørende, da for mange animationer kan forlænge indlæsningstiderne og øge energiforbruget. Ved at vælge en passende mængde animationer kan du sikre hurtigere indlæsning, hvilket forbedrer brugeroplevelsen og sparer båndbredde. <br> <br> Husk, at dit valg af animationsmængde kan have indflydelse på både ydeevne og bæredygtighed. Tænk over det, når du designer din hjemmeside!' },
                    // Add more articles here
            ]
        };
    }
};
</script>

<style scoped>
.library {
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    gap: 1rem;
}
</style>