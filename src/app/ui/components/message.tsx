import React from 'react'

export const Message = ({ type, message }) => {


    if (type === "INFO") {

        return (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Danger alert!</span> Change a few things up and try submitting again.
            </div>
        )
    }
    if (type === "SUCCESS") {
        return (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
            </div>
        )
    }
    if (type === "WARNING") {
        return (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Warning alert!</span> Change a few things up and try submitting again.
            </div>
        )
    }
    if (type === "DARK_ALERT") {
        return (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Dark alert!</span> Change a few things up and try submitting again.
            </div>
        )
    }
}
