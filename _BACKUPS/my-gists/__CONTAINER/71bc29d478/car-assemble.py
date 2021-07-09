import re


def get_file_content(include_tag):
    file_name = include_tag.split(" ")[1].replace('"', "")
    return open(file_name).read()


def main():
    """
    Lets dont worry about the program
    Its basically replacing <include file.svg> with its file content
    in the same file and produces final_car.svg as output
    This is purely to show, how we can work with multiple files in out git repository.
    """
    with open('car_assemble.svg') as file:  # reading source file car_assemble.svg
        file_content = file.read()

        regex = r"<include .*svg\" />"  # finding pattern <include file.svg> 
        matches = re.finditer(regex, file_content, re.MULTILINE)


        for matchNum, match in enumerate(matches, start=1):  # Replace each occurence of <include file.svg> with the contents of file.svg
            include_tag = match.group().strip()
            include_content = get_file_content(include_tag)
            file_content = file_content.replace(match.group(), include_content)

        with open('final_car.svg', 'w') as f:  # finally writing everything into final_car.svg 
            f.write(file_content)

main()  # Running main() when file is executed by "python car_assembler.py"