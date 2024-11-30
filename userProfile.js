let profilePic = document.getElementById("profile")
    let inputFile = document.getElementById("input-file")
    inputFile.onchange = () => {
        profilePic.src = URL.createObjectURL(inputFile.files[0])
    }