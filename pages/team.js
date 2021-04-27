import { request,MENSCHEN } from "../lib/datocms";


const Team =(props)=>{
    console.log("Team props",props);
    return(
            <div >
                    Teams
            </div>
    )
}

 export default Team;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps() {
    const menschen = await request({
        query: MENSCHEN,
      });

    return {
      props: {
        menschen,   
      }, // will be passed to the page component as props
    }
  }


