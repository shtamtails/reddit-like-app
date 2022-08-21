interface IComment {
  id: number;
  username: string;
  message: string;
  subcomments: IComment[];
}

export const Comments = () => {
  const comments = [
    {
      id: 0,
      username: "Anya",
      message:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet illum modi velit vel, facilis id pariatur sit eum exercitationem quibusdam.",
      subcomments: [
        {
          id: 1,
          username: "Doe",
          message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, in.",
          subcomments: [],
        },
        {
          id: 2,
          username: "John",
          message:
            "Aliquam sed semper magna, non efficitur odio. Nunc accumsan eu ligula non aliquet. Maecenas rhoncus auctor est, sit amet tempor turpis placerat sit amet.",
          subcomments: [],
        },
      ],
    },
    {
      id: 3,
      username: "Loren",
      message:
        "Nullam scelerisque pulvinar lorem, a tincidunt tortor aliquet at. Cras ornare diam eu metus fermentum rutrum. Nam neque massa, volutpat sed iaculis in, fringilla sit amet nisi",
      subcomments: [
        {
          id: 4,
          username: "Vitya",
          message:
            "Suspendisse eleifend id sapien vitae faucibus. Nullam scelerisque felis mi, id facilisis eros congue in. Cras tincidunt ut quam ac vehicula. Aenean semper justo id sem malesuada, ac rhoncus erat hendrerit. Etiam sollicitudin sem in justo pulvinar, non sollicitudin purus maximus. Mauris maximus bibendum orci, tristique sollicitudin justo sodales vel",
          subcomments: [
            {
              id: 5,
              username: "Zhenya",
              message:
                "Integer auctor libero faucibus ligula dignissim, id tempus sem luctus. Donec ipsum ligula, dignissim ac molestie viverra, pretium nec dolor.",
              subcomments: [
                {
                  id: 6,
                  username: "Oleg",
                  message:
                    "In hac habitasse platea dictumst. Nulla nibh augue, scelerisque vitae laoreet et, condimentum id ligula.",
                  subcomments: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const recursion = (comment: IComment) => {
    return (
      <>
        <li>
          <span className="text-xs font-bold">{comment.username}:</span>
          <span className="text-xs"> {comment.message}</span>
        </li>
        <ul className="subcomment">
          {comment.subcomments.map((subcomment: IComment) => {
            return recursion(subcomment);
          })}
        </ul>
      </>
    );
  };

  return (
    <ul>
      {comments.map((comment: IComment) => {
        return recursion(comment);
      })}
    </ul>
  );
};
