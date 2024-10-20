import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ text }) => {
  //tu récupères l'état de navigation
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  //On peut désactiver un bouton de soumission pendant le traitement du formulaire pour éviter que l'utilisateur ne soumette plusieurs fois.

  //Par exemple, si isSubmitting est défini sur true lorsque le formulaire est en cours de soumission, le bouton reste désactivé jusqu'à la fin de l'opération.
  return (
    <button
      className="rounded-lg py-3 bg-pink-600 text-slate-700 w-full uppercase font-semibold hover:bg-pink-300"
      disabled={isSubmitting}
    >
      {isSubmitting ? <>sending ...</> : text || 'submit'}
    </button>
  )
}

export default SubmitBtn
