export default function EmployeeDetail({heading,details,detailsInfo}){
    
    return <div>
        <h2>{heading}</h2>
        {details.map((detail,index)=><>
            <h3>{detail}</h3>
            <p>{detailsInfo[index]}</p>
        </>)}
    </div>
    
}