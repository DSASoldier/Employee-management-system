export default function InputComponent({headline,names}){

    return <div>

        <h3>{headline}</h3>

        {names.map((name,index)=><div>

            <p>{name}</p>
            <input type="text" />

        </div>)}
                
    </div>
}