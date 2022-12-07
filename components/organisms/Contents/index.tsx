import NewsList from '../../molecules/NewsList'


interface ContentNewsProps {
  contents: [];
}


interface ContentNewsMapProps {
  id: string;
  title: string;
  desc: [];
  date: string;
  categories: [];
}


function ContentNews({ contents } : ContentNewsProps) {
  return (
    <>
      {contents.map(( group: ContentNewsMapProps, index: number ) =>
        <NewsList
          key={index}
          id={group.id}
          title={group.title}
          desc={group.desc}
          time={group.date}
          category={group.categories}
        />
      )}
    </>
  )
}


export default ContentNews