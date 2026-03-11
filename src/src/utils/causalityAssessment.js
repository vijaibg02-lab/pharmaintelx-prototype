export function assessCausality(reaction){

if(reaction.temporalRelation && reaction.dechallenge){
return "Probable"
}

if(reaction.temporalRelation){
return "Possible"
}

return "Unlikely"

}