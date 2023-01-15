import "../Appearance.css"

const fonts = [
    {
        id: 1,
        databaseName: '',
        style: ''
    },
    {
        id: 2,
        databaseName: '',
        style: ''
    },
    {
        id: 3,
        databaseName: '',
        style: ''
    },
    {
        id: 4,
        databaseName: '',
        style: ''
    },
    {
        id: 5,
        databaseName: '',
        style: ''
    },
    {
        id: 6,
        databaseName: '',
        style: ''
    }
]

function Typography() {
  return (
    <div className="section_container">
        {fonts.map((font, key) => {
            return (
                <div key={font.id}>
                    ABC
                </div>
            )
        })}
    </div>
  )
}

export default Typography