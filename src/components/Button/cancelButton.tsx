
type Props = {
    text : string
}

const cancelButton = ({text} : Props) => {
    <button type="button" className="rounded-md text-sm font-semibold leading-6 text-gray-900">
      {text}
    </button>
}